import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';


@Controller('purchase-orders')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @Post()
  createPurchaseOrder(@Body() data) {
    return this.purchaseOrderService.createPurchaseOrder(data);
  }

  @Get()
  getAllPurchaseOrders() {
    return this.purchaseOrderService.findAll();
  }

  @Get(':poId')
  getPurchaseOrder(@Param('poId') poId: string) {
    const id = Number(poId); // Convert poId to number
    return this.purchaseOrderService.findOne(id);
  }

  @Put(':poId')
  updatePurchaseOrder(@Param('poId') poId: string, @Body() data) {
    const id = Number(poId); // Convert poId to number
    return this.purchaseOrderService.updatePurchaseOrder(id, data);
  }

  @Delete(':poId')
  deletePurchaseOrder(@Param('poId') poId: string) {
    const id = Number(poId); // Convert poId to number
    return this.purchaseOrderService.deletePurchaseOrder(id);
  }

  @Post(':poId/acknowledge')
  acknowledgePurchaseOrder(@Param('poId') poId: string) {
    const id = Number(poId); // Convert poId to number
    return this.purchaseOrderService.acknowledge(id);
  }
}
