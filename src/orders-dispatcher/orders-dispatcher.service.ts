import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AssignmentData,
  CreateAssignmentsResponse,
} from '../shared/presentation/assignments.response';
import { CreateAssignmentsRequest } from '../shared/presentation/create.assignments.request';

@Injectable()
export class OrdersDispatcherService {
  private calculateDistances(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const p = 0.017453292519943295; // Math.PI / 180
    const cos = Math.cos;
    const answer =
      0.5 -
      cos((lat2 - lat1) * p) / 2 +
      (cos(lat1 * p) * cos(lat2 * p) * (1 - cos((lon2 - lon1) * p))) / 2;

    return 12742 * Math.asin(Math.sqrt(answer)); // 2 * R; R = 6371 km
  }

  private updateTimeAndCoordinates(
    courierList: any[],
    id?: number,
    newTime: number = 0,
    lat?: number,
    lon?: number,
  ): any[] {
    if (id) {
      Object.assign(
        courierList.find((courier) => courier.id === id),
        {
          timeSpentInMinutes: newTime,
          lat: lat,
          lon: lon,
        },
      );
    } else {
      courierList.forEach((courier) => (courier.timeSpentInMinutes = 0));
    }
    return courierList;
  }

  private isEverythingUnique(arr): boolean {
    const uniqueValues = new Set(arr.map((item) => item.id));
    return [...uniqueValues].length === arr.length;
  }

  async assignOrders(
    input: CreateAssignmentsRequest,
  ): Promise<CreateAssignmentsResponse> {
    if (!this.isEverythingUnique(input.couriers)) {
      throw new BadRequestException('Couriers ids must be unique');
    }
    if (!this.isEverythingUnique(input.orders)) {
      throw new BadRequestException('Orders ids must be unique');
    }
    const assignments = [];
    let couriers = this.updateTimeAndCoordinates(input.couriers);

    for (let order of input.orders) {
      const solutions = [];
      for (let courier of couriers) {
        const distanceToPickUp = this.calculateDistances(
          courier.lat,
          courier.lon,
          order.actions[0].lat,
          order.actions[0].lon,
        );

        const distanceFromPickUpToDelivery = this.calculateDistances(
          order.actions[0].lat,
          order.actions[0].lon,
          order.actions[1].lat,
          order.actions[1].lon,
        );

        const totalDistance = distanceToPickUp + distanceFromPickUpToDelivery;

        //Converting to m/s for a better accuracy especially for short distance delivery
        const timeInSeconds =
          (totalDistance * 1000) /
            ((input.configuration.courierSpeedKmH * 5) / 18) +
          courier.timeSpentInMinutes * 60;

        const maxTimeInSeconds =
          input.configuration.maxDeliveryTimeMinutes * 60;

        if (maxTimeInSeconds >= timeInSeconds) {
          solutions.push({
            distance: totalDistance,
            courierId: courier.id,
            deliveryTimeMinutes: timeInSeconds / 60,
            lat: order.actions[1].lat,
            lon: order.actions[1].lon,
          });
        }
      }
      if (solutions.length) {
        if (solutions.length > 1) {
          solutions.sort((a, b) => a.distance - b.distance);
        }
        const solution = solutions[0];

        assignments.push(
          new AssignmentData({
            courierId: solution.courierId,
            orderId: order.id,
            deliveryTimeMinutes: solution.deliveryTimeMinutes,
          }),
        );

        couriers = this.updateTimeAndCoordinates(
          input.couriers,
          solution.courierId,
          solution.deliveryTimeMinutes,
          solution.lat,
          solution.lon,
        );
      }
    }

    return new CreateAssignmentsResponse(assignments);
  }
}
