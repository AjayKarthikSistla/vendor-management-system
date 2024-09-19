import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrderController } from './purchase-order.controller';
import { PurchaseOrder } from '../../entitites/purchase-order.entity';
import { VendorModule } from '../vendor/vendor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseOrder]), // Register the PurchaseOrder entity
    VendorModule, // Import the VendorModule to handle vendor relationships
  ],
  providers: [PurchaseOrderService],
  controllers: [PurchaseOrderController],
})
export class PurchaseOrderModule {}
