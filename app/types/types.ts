import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export type InputType =
  | "text"
  | "select"
  | "multi-select"
  | "date"
  | "custom-comp"
  | "textarea"
  | "range"
  | "checkbox"
  | "group-checkbox"
  | "radio"
  | "number"
  | "switch"
  | "text-editor"
  | "rich-text"
  | "password"
  | "phone"
  | "otp"
  | "file";

export type InputConfig = {
  type: InputType;
  name: Path<FieldValues>;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  options?: {
    label: string;
    value: string;
    id?: string | number;
    identity?: string;
    name?: string;
  }[];
  min?: number;
  max?: number;
  step?: number;
  sliderLeftDescription?: string;
  sliderRightDescription?: string;
  labelToolTip?: string;
  customComp?: React.ReactNode;
  description?: string;
  topDescription?: string;
  tag?: {
    text: string;
    color: string;
  };
  className?: string;
  customOnChange?:
    | ((value: string, options: unknown) => void)
    | ((e: unknown) => void);
  labelClassName?: string;
  inputClassName?: string;
  onInputChange?: (value: string) => void;
  required?: boolean;
  validation?: unknown;
  conditionalRender?: (formValues: unknown) => boolean;
  // Optional UI state props for specific inputs (used by AppInput)
  readOnly?: boolean;
  disabled?: boolean;
  onPasswordChangeClick?: () => void;
  changePasswordText?: string;
  // Edit button props (used by AppInput)
  showEditButton?: boolean;
  onEditClick?: () => void;
  // File upload props (used by AppFileUpload)
  accept?: { [key: string]: string[] };
  bottomDesc?: string;
  maxFileSize?: number;
  maxFiles?: number;
  endpoint?: string;
  listIsLoading?: boolean;
  uploadedOrientation?: "horizontal" | "vertical";
  mode?: "single" | "multiple";
  // Multi-select create option props
  createEndpoint?: string;
  onOptionsRefetch?: () => void;
  createPayloadKey?: string;
  // Checkbox group props (used by AppCheckboxGroup)
  gridClassName?: string;
  showUploadedFiles?: boolean;
  // Rich text specific (optional)
  toolbarOptions?: string[];
  // Form message styling
  formMessageClassName?: string;
  // OTP specific
  otpLength?: number;
  // Prefix styling
  prefixClassName?: string;
};

export type InputGroup = {
  wrapperClassName?: string;
  render: InputConfig[];
  subTitle?: string;
  subTitleClassName?: string;
  outerWrapperClassName?: string;
};

export interface IUserData {
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  user_type: string;
  designer_type?: string;
  teams: Array<{
    id: number;
    uuid: string;
    identity: string;
    owner: boolean;
  }>;
}

export interface IUserInfoResponse extends IUserData {
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}

export interface ILoginResponse {
  data: IUserInfoResponse;
  status: string;
  status_code: number;
  action_code: string;
}

export interface ITeam {
  id: number;
  uuid: string;
  identity: string;
  owner: boolean;
}

export interface IWebsiteListResponse {
  id: number;
  uuid: string;
  url: string;
  total_chars: number;
  team_id: number;
  chatbot_id: number | null;
  size: number;
  status: string;
  type: IWebsiteLinkType;
  last_crawled_on: string | null;
}

export interface ITextFile {
  id: number;
  title: string;
  size: number;
  status: string;
  text: string;
  total_chars: number;
  uuid: string;
}

export interface IChatThread {
  id: string;
  uuid: string;
  initial_message: string;
  source: string;
  chatbot_id: number;
  first_user_question: string;
  first_ai_response: string;
  created: string;
}

export interface IAppTableHeader {
  [key: string]: string;
}

export interface IAppTableBody {
  [key: string]: string | number | boolean;
}

export interface IAppTable {
  headers: IAppTableHeader;
  body: IAppTableBody[];
  selectedRows?: object[];
  actions?: IAppTableAction[];
  page: number;
  perPage?: number;
  total: number;
  setPage: (page: number) => void;
  isLoading?: boolean;
  hidePagination?: boolean;
  addIndex?: boolean;
  customValueRender?: {
    [key: string]: (row: IAppTableBody, header: string) => React.ReactNode;
  };
  handleRowClick?: (row: IAppTableBody) => void;
}

export interface IAppTableWithSearchAndFilter extends IAppTable {
  // search: {
  //   placeholder: string;
  //   onChange: (value: string) => void;
  // };
  // filter: {
  //   placeholder: string;
  //   onChange: (value: string) => void;
  // };
  handleSearch: (value: string) => void;
  searchPlaceholder?: string;
  asideComp?: React.ReactNode;
  formUtils?: UseFormReturn;
  filterInputArr?: InputGroup[];
  customListComp?: React.ReactNode;
}

export interface IAppTableAction {
  label: string;
  // onClick: () => void;
  render: (row: unknown) => React.ReactNode;
}

export interface IAppTableActions {
  actions?: IAppTableAction[];
}

export interface IAppTableSelectedRows {
  selectedRows?: object[];
}

export type IWebsiteLinkType = "url" | "crawl-url" | "sitemap-url";

export interface IChildLink {
  id: number;
  url: string;
  status: string;
  size: number;
  total_chars: number;
}

export interface BadgeItem {
  label: string;
  value: string;
}

export interface IValueToDisplay {
  obj: {
    url: string;
    include_paths?: string;
    exclude_paths?: string;
    id: number;
    uuid: string;
    type: IWebsiteLinkType;
  };
  type: IWebsiteLinkType;
  parentId?: number;
}

export interface EditLinkFormData {
  url: string;
  include_paths: BadgeItem[];
  exclude_paths: BadgeItem[];
}

// Saas Response for Pricing Plans
// {
//   "data": {
//       "count": 3,
//       "next": null,
//       "previous": null,
//       "results": [
//           {
//               "id": 37,
//               "uuid": "6a7d96ac-c675-4eaf-a1c1-06e24a926564",
//               "plan": {
//                   "id": 39,
//                   "uuid": "999432bf-0873-4e12-a6b7-02c72d12290f",
//                   "plan_id": "Pro-plan",
//                   "identity": "Pro plan",
//                   "external_identity": "Pro plan",
//                   "description": "Unlimited features",
//                   "status": true,
//                   "type": "plan",
//                   "hierarchy": 3
//               },
//               "currency_code": "USD",
//               "price": 10000,
//               "period_unit": "day",
//               "features": [
//                   {
//                       "id": 8,
//                       "uuid": "9a8e2ed0-1ed8-4691-aa84-9a761549254f",
//                       "feature": {
//                           "id": 8,
//                           "uuid": "b56d322b-9050-472e-9d28-9754b8e73ec5",
//                           "identity": "ai-agents",
//                           "feature_name": "AI Agents",
//                           "description": "AI Agent",
//                           "type": "quantity",
//                           "status": "active",
//                           "unit": "AI Agents"
//                       },
//                       "is_available": false,
//                       "value": 3,
//                       "is_unlimited": false
//                   },
//                   {
//                       "id": 12,
//                       "uuid": "c8dd09dd-5a43-4a8b-84c6-1f07b3e4d015",
//                       "feature": {
//                           "id": 10,
//                           "uuid": "7cf6352b-f233-4efa-9ff0-7b6c2a509159",
//                           "identity": "memory-size",
//                           "feature_name": "Memory Size",
//                           "description": "MB per AI Agent",
//                           "type": "quantity",
//                           "status": "active",
//                           "unit": "MB"
//                       },
//                       "is_available": false,
//                       "value": 30,
//                       "is_unlimited": false
//                   }
//               ]
//           },
//           {
//               "id": 36,
//               "uuid": "d032da35-a02d-44e7-8053-597e2c7aafc1",
//               "plan": {
//                   "id": 37,
//                   "uuid": "5ee182c2-98b5-4718-93b9-b5e10d452b55",
//                   "plan_id": "Intermediate-Plan",
//                   "identity": "Intermediate Plan",
//                   "external_identity": "Intermediate Plan",
//                   "description": "Powerful tools for scaling business",
//                   "status": true,
//                   "type": "plan",
//                   "hierarchy": 2
//               },
//               "currency_code": "USD",
//               "price": 2000,
//               "period_unit": "day",
//               "features": [
//                   {
//                       "id": 9,
//                       "uuid": "3ad6e58a-f06f-4640-86c5-ec2a92dbad4a",
//                       "feature": {
//                           "id": 8,
//                           "uuid": "b56d322b-9050-472e-9d28-9754b8e73ec5",
//                           "identity": "ai-agents",
//                           "feature_name": "AI Agents",
//                           "description": "AI Agent",
//                           "type": "quantity",
//                           "status": "active",
//                           "unit": "AI Agents"
//                       },
//                       "is_available": false,
//                       "value": 1,
//                       "is_unlimited": false
//                   },
//                   {
//                       "id": 13,
//                       "uuid": "fb08c5ed-22e3-4696-8424-ef9ac4f7edd3",
//                       "feature": {
//                           "id": 10,
//                           "uuid": "7cf6352b-f233-4efa-9ff0-7b6c2a509159",
//                           "identity": "memory-size",
//                           "feature_name": "Memory Size",
//                           "description": "MB per AI Agent",
//                           "type": "quantity",
//                           "status": "active",
//                           "unit": "MB"
//                       },
//                       "is_available": false,
//                       "value": 30,
//                       "is_unlimited": false
//                   }
//               ]
//           },
//           {
//               "id": 35,
//               "uuid": "4c7b7a21-0a14-498d-a73c-d40d9ccc91b8",
//               "plan": {
//                   "id": 36,
//                   "uuid": "cdcd010e-a1fd-47bd-993b-b4a10a4a36d8",
//                   "plan_id": "Basic-Plan",
//                   "identity": "Basic Plan",
//                   "external_identity": "Basic Plan",
//                   "description": "Perfect for getting started with AI agents",
//                   "status": true,
//                   "type": "plan",
//                   "hierarchy": 1
//               },
//               "currency_code": "USD",
//               "price": 0,
//               "period_unit": "day",
//               "features": [
//                   {
//                       "id": 10,
//                       "uuid": "61149856-3145-4212-b14a-3bbc2009fa02",
//                       "feature": {
//                           "id": 8,
//                           "uuid": "b56d322b-9050-472e-9d28-9754b8e73ec5",
//                           "identity": "ai-agents",
//                           "feature_name": "AI Agents",
//                           "description": "AI Agent",
//                           "type": "quantity",
//                           "status": "active",
//                           "unit": "AI Agents"
//                       },
//                       "is_available": false,
//                       "value": 1,
//                       "is_unlimited": false
//                   },
//                   {
//                       "id": 11,
//                       "uuid": "eb6c236e-fe17-4e17-9733-80649cd329f1",
//                       "feature": {
//                           "id": 10,
//                           "uuid": "7cf6352b-f233-4efa-9ff0-7b6c2a509159",
//                           "identity": "memory-size",
//                           "feature_name": "Memory Size",
//                           "description": "MB per AI Agent",
//                           "type": "quantity",
//                           "status": "active",
//                           "unit": "MB"
//                       },
//                       "is_available": false,
//                       "value": 1,
//                       "is_unlimited": false
//                   }
//               ]
//           }
//       ]
//   },
//   "status": "success",
//   "status_code": 200,
//   "action_code": "DO_NOTHING"
// }
export interface IPricingPlanCard {
  id: number;
  uuid: string;
  plan: IPlan;
  currency_code: string;
  price: number;
  period_unit: string;
  features: IFeature[];
  isCurrentPlan: boolean;
  upgradePlan: (uuid: string) => void;
  isUpgradeLoading: boolean;
  currentPlanHierarchy: number;
  pricing_model: "flat_fee" | "per_unit";
  onCancelPlan: (uuid: string) => void;
}

export interface IPlan {
  id: number;
  uuid: string;
  plan_id: string;
  identity: string;
  external_identity: string;
  description: string;
  status: boolean;
  type: "addon" | "plan";
  hierarchy: number;
}

export interface IFeature {
  id: number;
  uuid: string;
  feature: IFeatureDetail;
  is_available: boolean;
  value: number;
  is_unlimited: boolean;
}

export interface IFeatureDetail {
  id: number;
  uuid: string;
  identity: string;
  feature_name: string;
  description: string;
  type: string;
  status: string;
  unit: string;
}

// export interface IAddon {
//   id: number;
//   uuid: string;
//   identity: string;
//   feature_name: string;
//   description: string;
//   status: string;
//   unit: string;
//   type: "per_unit" | "flat_fee";
// }

// Sample Subscription Details
export interface ISubscriptionDetails {
  id: number;
  uuid: string;
  billing_period: string;
  billing_period_unit: string;
  current_period_start: string;
  current_period_end: string;
  next_billing_at: string;
  plan: string;
  plan_uuid: string;
  addons: IAddon[];
}

export interface IAddon {
  id: number;
  uuid: string;
  quantity: number;
  billing_period: string;
  billing_period_unit: string;
  current_period_start: string;
  current_period_end: string;
  next_billing_at: string;
  plan: string;
  plan_uuid: string;
}

export interface ISubscriptionFeatures {
  team_id: number;
  chatbot_id: number | null;
  features: {
    ai_agents: {
      used: number;
      limit: number;
      is_allowed: boolean;
    };
    memory_usage: {
      used: number;
      limit: number;
      is_allowed: boolean;
    };
  };
}

export interface ISubscriptionFeaturesContext {
  subscriptionFeatures: ISubscriptionFeatures | null;
  isLoadingSubscriptionFeatures: boolean;
}
