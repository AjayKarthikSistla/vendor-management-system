import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderModule } from './modules/purchase-order/purchase-order.module';
import { VendorModule } from './modules/vendor/vendor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your-username',
      password: 'your-password',
      database: 'vendor_management',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    PurchaseOrderModule,
    VendorModule,
  ],
})
export class AppModule {}
