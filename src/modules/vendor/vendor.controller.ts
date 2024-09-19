import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { VendorService } from './vendor.service';

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  createVendor(@Body() data) {
    return this.vendorService.createVendor(data);
  }

  @Get()
  getAllVendors() {
    return this.vendorService.findAll();
  }

  @Get(':vendorId')
  getVendor(@Param('vendorId') vendorId: string) {
    return this.vendorService.findOne(vendorId);
  }

  @Put(':vendorId')
  updateVendor(@Param('vendorId') vendorId: string, @Body() data) {
    return this.vendorService.updateVendor(vendorId, data);
  }

  @Delete(':vendorId')
  deleteVendor(@Param('vendorId') vendorId: string) {
    return this.vendorService.deleteVendor(vendorId);
  }

  @Get(':vendorId/performance')
  getVendorPerformance(@Param('vendorId') vendorId: string) {
    return this.vendorService.getVendorPerformance(vendorId);
  }
}
