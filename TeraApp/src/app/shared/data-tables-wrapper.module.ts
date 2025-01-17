import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [DataTablesModule],
  exports: [DataTablesModule]
})
export class DataTablesWrapperModule {}
