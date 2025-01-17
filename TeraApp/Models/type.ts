export type OrderDetails = {
    id?: number;
    orderMasterId?: number;
    itemId?: number;
    itemName?: string;
    groupId?: number;
    unitId?: number;
    qty?: number;
    rate?: number;
    amount?: number;
  }

  export type OrderMaster = {
    id?: number;
    orderNo?: string;
    partyId?: number;
    partyName?: string;
    phone?: string;
    address?: string;
    orderDate?: Date;
    saleTypeId?: number;
    orderTotal?: number;
    orderDetails?: OrderDetails[];
  }
  
  export type ItemMaster = {
    id?: number;
    code?: string;
    name?: string;
    unitId?: number;
    unit?: UnitMaster;
    groupId?: number;
    group?: GroupMaster;
  }

  export type UnitMaster = {
    id?: number;
    code?: string;
    name?: string;
  }

  export type GroupMaster = {
    id?: number;
    code?: string;
    name?: string;
  }

  export type PartyMaster = {
    id?: number;
    name?: string;
    phone?: string;
    address?: string
  }
  
  export type SaleTypeMaster = {
    id?: number;
    code?: string;
    name?: string;
  }

  export type LogisticsInfo = {
   id?: number; 
   ordeR_NO?: number;
   invoicE_NO?: number;
   coc?: string;
   actuaL_VESSEL_DETAILS?: string;
   actuaL_SOB?: Date;
   targeT_SOB?: Date;
   raiL_OUT?: Date;
   targeT_ETA?: Date;
   actuaL_ETA?: Date;
   cargO_UNLOADING_DATE?: Date;
   remarks?: string;
  }
  
  export type ProformaPanel = {
    roW_NO?: number;
    operatinG_UNIT?: string;
    warehouse?: string;
    saleS_PERSON?: string;
    ordeR_NO?: string;
    ordeR_DATE?: Date;
    customeR_NAME?: string;
    country?: string;
    currency?: string;
    exchangE_RATE?: number;
    iteM_DESC?: string;
    shade?: string;
    quality?: string;
    ordereD_QTY?: number;
    dispatcheD_QTY?: number;
    uom?: string;
    modE_OF_SHIPMENT?: string;
    blend?: string;
    shippinG_MARK1?: string;
    packinG_INSTRUC?: string;
  };
  
  export type LogisticsEdit = {
    ordeR_No?: string | null;
    pA_NO?: string | null;
    totalOrderQty?: number;
    pino?: string;
    piDate?: Date;
    customer?: string;
    agent?: string;
    price?: number;
    fobValue?: number;
    paDate?: Date | null;
    lcNo?: string | null;
    advanceValue?: number | null;
    lds?: string | null;
    invoiceNo?: string | null;
    invoiceDate?: Date | null;
    invoiceQnty?: number | null;
    invoiceValue?: number | null;
    negotiationValue?: number | null;
    shippingBillNo?: string | null;
    shippingBillDate?: Date | null;
    customSealNo?: string | null;
    lineSealNo?: string | null;
    cha?: string | null;
    forwarder?: string | null;
    shippingLine?: string | null;
    freight?: number | null;
    loadingPort?: string | null;
    destinationPort?: string | null;
    coc?: string | null;
    railOut?: Date | null;
    targetSOB?: Date | null;
    actualSOB?: Date | null;
    actualVesselDetails?: string | null;
    targetETA?: Date | null;
    actualETA?: Date | null;
    cargoUnloadingDate?: Date | null;
    remarks?: string | null;
  };
  

export type CompanyMaster = {
        id?: number;
    companyName?: string;
    legalName?: string;
    shortName?: string;
    address?: string;
    city?: string;
    phone?: string;  
    emailId?: string;
    gstin?: string;
    pan?: string;
    enteredBy?: string;
    enteredOn?: string | null;
    updatedBy?: string;
    updatedOn?: string | null;
    totalRows?: number;
}

export type RoleMaster = {
  id: number;
  roleName: string;
  description: string;
  enteredBy: string;
  enteredOn: string | null;
  updatedBy: string;
  updatedOn: string | null;
  totalRows?: number;
}

export type FinancialYearMaster = {
  id?: number;
  fromDate?: Date;
  toDate?: Date;
  enteredBy?: string;
  enteredOn?: string | null;
  updatedBy?: string;
  updatedOn?: string | null;
  totalRows?: number;
}

export type MenuMaster =  {
  id?: number;
  parent?: string,
  parentId?: number,
  menuTitle?: string,
  link?: string,
  icon?: string,
  isOpen?: boolean,
  controllerName?: string,
  actionName?: string,
  enteredBy?: string;
  enteredOn?: string | null;
  updatedBy?: string;
  updatedOn?: string | null;
  totalRows?: number;
}

export type UserMaster = {
  id?: number;
  fullName?: string;
  lastName?: string;
  firstName?: string;
  userName?: string;
  password?: string;
  roleId?: number;
  email?: string;
  emailPassword?: string;
  mobileNo?: string;
  photo?: string;
  enteredBy?: string;
  enteredOn?: string | null;
  updatedBy?: string;
  updatedOn?: string | null; 
  selectedCompanies?: SelectedCompany[] | null; // Assuming SelectedCompany is a defined type
};

export type SelectedCompany = {
  id: number;
  userId: number;
  companyId: number;
};

export type RolePermissions = {
  id?: number ;
  menuId?: number;
  parentName?: string;
  actionName?: string;
  isAdd?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
  isDisplay?: boolean;
  roleId?: number;
  enteredBy?: string;
  enteredOn?: Date;
  updatedBy?: string;
  updatedOn?: Date;
};

export type CustomerMaster={
    id?: number;
    shortName?: string;
    address?: string;
    city?: string;
    phone?: string;  
    emailId?: string;
    pan?: string;
    orderNo?:number;
    enteredBy?: string;
    enteredOn?: string | null;
    updatedBy?: string;
    updatedOn?: string | null;
    totalRows?: number;
}



