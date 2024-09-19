import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { Vendor } from '../../entitites/vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor])], // Register the Vendor entity
  providers: [VendorService],
  controllers: [VendorController],
  exports: [VendorService], // Export VendorService to be used in other modules like PurchaseOrderModule
})
export class VendorModule {}
