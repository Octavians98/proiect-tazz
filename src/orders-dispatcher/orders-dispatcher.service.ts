import { Injectable } from '@nestjs/common';
import {
  AssignmentData,
  CreateAssignmentsResponse,
} from 'src/shared/presentation/assignments.response';
import { CreateAssignmentsRequest } from 'src/shared/presentation/create.assignments.request';

@Injectable()
export class OrdersDispatcherService {
  private calculateDistances(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const p = 0.017453292519943295; // Math.PI / 180
    const c = Math.cos;
    const a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  async assignOrders(
    input: CreateAssignmentsRequest,
  ): Promise<CreateAssignmentsResponse> {
    const assignments = [];
    for (let order of input.orders) {
      const solutions = [];
      for (let courier of input.couriers) {
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
        const timeInSeconds =
          (totalDistance * 1000) /
          ((input.configuration.courierSpeedKmH * 5) / 18);
        const maxTimeInSeconds =
          input.configuration.maxDeliveryTimeMinutes * 60;

        if (maxTimeInSeconds >= timeInSeconds) {
          solutions.push({
            distance: totalDistance,
            courierId: courier.id,
            deliveryTimeMinutes: timeInSeconds / 60,
          });
        }
      }
      if (solutions.length > 1) {
        solutions.sort((a, b) => a.distance - b.distance);
        console.log('solutions', solutions);
      }
      assignments.push(
        new AssignmentData({
          courierId: solutions[0].courierId,
          orderId: order.id,
          deliveryTimeMinutes: solutions[0].deliveryTimeMinutes,
        }),
      );
    }

    return new CreateAssignmentsResponse(assignments);
  }
}
