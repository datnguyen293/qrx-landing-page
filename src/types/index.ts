
export enum VerifyStatus {
    SUCCESS = 'success',
    FAIL = 'fail',
    VERIFIED = 'verified',
    BLANK = 'new',
    OVER_LIMITED = 'over_limited',
    BLOCKED = 'blocked',
}

export type ICustomer = {
    name: string,
    phone: string,
}

export type IStampCode = {
    verification_code: string,
    status?: VerifyStatus,
    serial?: string,
    has_warranty: boolean,
}

export type IOrder = {
  description: string,
  name: string,
  stamp_type: string,
  status: string,
}

export type IWarehouse = {
  logo: string | null;
  dark_logo: string | null;
  name: string;
  slug: string;
  email: string;
  phone: string;
  show_email_on_invoice: number; // 1 or 0
  show_phone_on_invoice: number; // 1 or 0
  address: string | null;
  terms_condition: string | null;
  bank_details: string | null;
  signature: string | null;
  online_store_enabled: number; // 1 or 0
  customers_visibility: "all" | string;
  suppliers_visibility: "all" | string;
  products_visibility: "all" | string;
  default_pos_order_status: string;
  show_mrp_on_invoice: number; // 1 or 0
  show_discount_tax_on_invoice: number; // 1 or 0
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
  external_id: string | null;
  xid: string;
  x_company_id: string;
  logo_url: string;
  dark_logo_url: string;
  signature_url: string | null;
};

export type IPurchaseOrder = {
  related_quick_order_id: number;
  company_id: number;
  unique_id: string;
  invoice_number: string;
  invoice_type: string | null;
  order_type: "purchases" | string;
  order_date: string; // ISO 8601 format
  warehouse_id: number;
  tax_rate: number;
  tax_amount: number;
  discount: number;
  shipping: number;
  subtotal: number;
  total: number;
  paid_amount: number;
  due_amount: number;
  order_status: string; // e.g., "completed"
  prev_order_status: string | null;
  notes: string | null;
  document: string | null;
  payment_status: string; // e.g., "paid"
  total_items: number;
  total_quantity: number;
  terms_condition: string | null;
  is_deletable: number; // 1 or 0
  cancelled: number; // 1 or 0
  import_file_after: string | null;
  import_file_before: string | null;
  processed_at: string | null; // ISO 8601 format or null
  errors: string | null;
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
  deleted_at: string | null; // ISO 8601 format or null
  external_id: string | null;
  xid: string;
  x_related_order_id: string | null;
  x_return_order_id: string | null;
  x_related_quick_order_id: string;
  x_warehouse_id: string;
  x_from_warehouse_id: string | null;
  x_user_id: string;
  x_tax_id: string | null;
  x_staff_user_id: string;
  x_cancelled_by: string | null;
  document_url: string;
  warehouse: IWarehouse;
  from_warehouse: IWarehouse | null;
}

export type ISaleOrder = {
  created_at: string,
  invoice_number: string,
  order_date: string,
  updated_at: string,
}

export type ICommonField = {
    id?: string,
    name?: string
}

export type IProduct = {
    code?: string;
    price: number;
    slug: string;
    note?: string;
    image: string;
    images?: Array<string>;
    unit?: string;
    category?: string;
    brand: string,
    is_show_product_price: boolean,
    related_products: Array<IProduct>;
} & ICommonField;

export type ICompany =  {
    logo: string
    address: string
    email?: string
    phone?: string
    date_format?: string
    time_format?: string
    timezone?: string
    social_networks?: Array<SocialNetwork>,
    currency?: ICurrency,
    serial_prefix: string;
    name: string;
    short_name: string;
    slug: string | null;
    website: string | null;
    light_logo: string;
    dark_logo: string;
    small_dark_logo: string;
    small_light_logo: string;
    app_layout: "sidebar" | "topbar" | "compact";
    rtl: 0 | 1;
    mysqldump_command: string;
    shortcut_menus: "top_bottom" | "left_right" | string;
    website_lang_id: string | null;
    left_sidebar_theme: "light" | "dark";
    primary_color: string;
    auto_detect_timezone: 0 | 1;
    session_driver: "file" | "database" | string;
    app_debug: 0 | 1;
    update_app_notification: 0 | 1;
    created_at: string; // ISO date string
    login_image: string | null;
    stripe_id: string | null;
    card_brand: string | null;
    card_last_four: string | null;
    trial_ends_at: string | null; // ISO date string
    package_type: "annual" | "monthly" | string;
    licence_expire_on: string; // ISO date string
    is_global: 0 | 1;
    status: "active" | "inactive" | string;
    total_users: number;
    email_verification_code: string;
    verified: 0 | 1;
    white_label_completed: 0 | 1;
    sms_prefix: string;
    verify_user_id: string | null;
    zma_version: string;
    xid: string;
    x_currency_id: string;
    x_warehouse_id: string;
    x_lang_id: string;
    x_admin_id: string;
    x_subscription_plan_id: string;
    x_payment_transaction_id: string;
    login_image_url: string | null;
    light_logo_url: string;
    dark_logo_url: string;
    small_light_logo_url: string;
    small_dark_logo_url: string;
    beep_audio_url: string | null;
    x_verify_company_id: string | null;
    x_verify_user_id: string | null;
}

export type ICurrency = {
    code: string,
    symbol: string,
    name: string,
}

export type SocialNetwork = {
    key: string,
    value: string
}

export type IFormVerify = {
    name: string;
    phone: string;
    verification_code: string;
    serial?: string;
}

export type ITemplate = {
    name: string,
    code:  string,
    data: {
        text_default: string,
        color_warring: string,
        color_success: string,
        color_error: string
    }
}

export type IMessage = {
    logo: string,
    title: string,
    content: string
}

export type IScanQRCodeData = {
    product: IProduct,
    company: ICompany,
    template: ITemplate,
    customer?: ICustomer,
    stamp_code?: IStampCode,
    message?: IMessage,
    redirect_url?: string
}

export type APIResponse<T> = {
    data: T,
    message: string,
}

export type IsContactFrom = {
    name: string,
    phone: string,
    email: string,
    content: string,
}

export type IsContactRulers = {
    name: Array<any>,
    phone: Array<any>,
    email: Array<any>,
    content: Array<any>
}

export type IResStampOld = {
    serial: string
}
export type IZaloCustomer = {
    name: string,
    phone: string
}

export type IStampStatus =
  | 'checking'
  | 'new'
  | 'product_assigned'
  | 'processing'
  | 'sold'
  | 'warranty_processing'
  | 'warranty_replaced'
  | 'activated'
  | 'blocked'
  | 'not_enough_stamp'
  | 'out_of_stamp';

export type ITagType =
  | 'processing'
  | 'success'
  | 'error'
  | 'warning'
  | 'magenta'
  | 'red'
  | 'volcano'
  | 'orange'
  | 'gold'
  | 'lime'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'geekblue'
  | 'purple';
  
export type IUnit = {
  base_unit: string | null;
  company_id: number;
  created_at: string;
  external_id: string | null;
  is_deletable: number;
  name: string;
  operator: string;
  operator_value: string;
  short_name: string;
  updated_at: string;
  xid: string;
};

export type IUser = {
  company_id: number;
  company_parent_id: number;
  is_superadmin: 0 | 1;
  is_all_warehouses: 0 | 1;
  lang_id: string | null;
  group_id: string | null;
  zalo_id: string | null;
  user_type: "customers" | "admin" | "staff" | string;
  is_walkin_customer: 0 | 1;
  login_enabled: 0 | 1;
  name: string;
  email: string | null;
  phone: string;
  profile_image: string | null;
  address: string | null;
  shipping_address: string | null;
  email_verification_code: string | null;
  status: "enabled" | "disabled" | string;
  reset_code: string | null;
  timezone: string;
  date_format: string; // e.g., "d-m-Y"
  date_picker_format: string; // e.g., "dd-mm-yyyy"
  time_format: string; // e.g., "h:i a"
  tax_number: string | null;
  loyalty_rank_point: number;
  loyalty_point: number;
  loyalty_member_tier_id: number | null;
  ref_user_id: number | null;
  created_by: number | null;
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
  external_id: string | null;
  xid: string;
  profile_image_url: string;
  x_warehouse_id: string | null;
};
  
export type IProductDetail = {
    company_id: number;
    product_type: string;
    parent_item_code: string | null;
    name: string;
    slug: string;
    barcode_symbology: string;
    item_code: string;
    image: string;
    description: string;
    created_at: string;
    updated_at: string;
    stock_quantity_alert: number | null;
    mrp: number;
    purchase_price: number;
    sales_price: number;
    purchase_tax_type: "exclusive" | "inclusive";
    sales_tax_type: "exclusive" | "inclusive";
    wholesale_price: number | null;
    wholesale_quantity: number | null;
    status: "in_stock" | "out_of_stock" | "discontinued";
    is_custom_verification: boolean;
    template_id: number;
    max_scan_count: number;
    max_client_count: number;
    verify_types: string[];
    has_price: boolean;
    has_warranty: boolean;
    warranty_id: number | null;
    service_id: number | null;
    management_method: "serialized" | "non_serialized";
    template: ITemplate;
    unit: IUnit;
};
  
export type IQrCheckInternal = {
  agency?: {
    address: string,
    email: string,
    name: string,
    phone: string,
  },
  customer: ICustomer | null;
  first_verification_at: string | null;
  company?: ICompany,
  created_at?: string,
  internal_serial?: string,
  order?: IOrder,
  product?: IProductDetail,
  purchase_order?: IPurchaseOrder,
  sale_order?: ISaleOrder,
  sales_date?: string,
  sales_invoice_no?: string,
  serial?: string,
  service?: any,
  status?: IStampStatus,
  updated_at?: string,
  verification_code?: string,
  warranty?: any,
}
