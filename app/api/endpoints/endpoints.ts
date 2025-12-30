export const callEndpoints = {
  makeACall: `/make-call`,
  getCallHistory: `/get-list`,
  getDetail: "/detail",
};

export const authEndpoints = {
  login: "/api/access/login/",
  signup: "/api/signup",
  refresh: "/api/access/refresh/",
  sendOtp: "/api/access/trigger-otp/",
  verifyOtp: "/api/access/validate-otp/",
  logout: "/api/access/logout/",
  resendOtp: "/api/access/resend-otp/",
};

export const clientEndpoints = {
  list: "/api/project/client/list/",
  meta: "/api/project/client/list/table-meta/",
  cud: (id: string) => `/api/admin-panel/client/cud/${id ? `${id}/` : ``}`,
  createMeta: "/api/admin-panel/client/cud/meta/",
  updateMeta: (id: string) => `/api/admin-panel/client/cud/${id}/meta`,
  updateDetail: (id: string) => `/api/admin-panel/client/update-detail/${id}/`,
  detail: (id: string) => `/api/project/client/detail/${id}/`,
  assignDesigner: (id: string) => `/api/project/executor/assign/${id}/`,
  projectTimeline: (id?: string) =>
    `/api/project/timeline/${id ? `${id}/` : ""}`,
  executionTimeline: (id: string) => `/api/project/execution-timeline/${id}/`,
  statusUpdate: (id: string) => `/api/user/projects/update/${id}/`,
  handoverDocument: (id: string) => `/api/project/handover/${id}/`,
  technicalDrawingUpload: `/api/project/technical-drawing/upload/`,
  technicalDrawingCreate: `/api/project/technical-drawing/create/`,
  technicalDrawingList: (id: string) =>
    `/api/project/technical-drawing/list/?project=${id}`,
};

export const projectEndpoints = {
  list: "/api/project/list/",
  detail: (id: string) => `/api/project/client/detail/${id}/`,
  designRenderImages: (id: string) => `/api/project/renders/${id}/`,
  meta: (id: string) => `/api/project/renders/meta/${id}/`,
  designRenderUpload: `/api/project/renders/create/`,
  designRenderFilesUpload: `/api/project/renders/upload/`,
  imageUpdate: (id: string) => `/api/project/renders/update/${id}/`,
  bulkShareWithClient: `/api/project/renders/status-update/`,
};

export const designRequestFormEndpoints = {
  upload: "/api/project/design-request-forms/files/upload/",
  meta: "/api/project/design-request-forms/meta/",
  submit: "/api/project/design-request-forms/cud/",
  detail: (id: string) => `/api/project/design-request-forms/${id}/`,
};
export const fileEndpoints = {
  upload: "/api/access/profile-picture/upload/",
};

export const designerEndpoints = {
  list: "/api/designer/list/",
  meta: "/api/designer/list/table-meta/",
  cud: (id: string) => `/api/designer/cud/${id ? `${id}/` : ``}`,
  createMeta: "/api/designer/cud/meta/",
  updateMeta: (id: string) => `/api/designer/cud/${id}/meta`,
  updateDetail: (id: string) => `/api/designer/update-detail/${id}/`,
  detail: (id: string) => `/api/designer/detail/${id}/`,
  portfolio: {
    detail: (id?: string) =>
      `/api/designer/portfolio/details/${id ? `?designer=${id}` : ""}`,
    update: (id?: string) =>
      `/api/designer/portfolio/cu/${id ? `?designer=${id}` : ""}`,
    language_meta: `/api/designer/portfolio/languages/list/`,
    languageCreate: `/api/designer/portfolio/languages/create/`,
    projectsList: (id?: string) =>
      `/api/designer/portfolio/projects/list/${id ? `?user=${id}` : ""}`,
    tagsList: `/api/designer/portfolio/tags/list/`,
    tagsCreate: `/api/designer/portfolio/tags/create/`,
    fileUpload: `/api/designer/portfolio/projects/files/upload/`,
    projectCreate: (id?: string) =>
      `/api/designer/portfolio/projects/cud/${id ? `${id}/` : ""}`,
    coverImageUpload: `/api/designer/portfolio/projects/cover-image/upload/`,
  },
};

export const metaEndpoints = {
  region: "/api/common/region/list/",
};

// Reports Module Endpoints
// Always import and use these instead of hardcoding anywhere else
export const reportEndpoints = {
  list: "/api/admin-panel/reports/list/",
  // Generate/download a report by key. Accepts query params like q, start_date, end_date
  generate: (key: string) => `/api/admin-panel/reports/${key}/generate/`,
};

// Client App Sections Endpoints
export const clientAppEndpoints = {
  list: "/api/admin-panel/client-app/sections/",
};

// Support Tickets Endpoints
export const supportTicketEndpoints = {
  list: "/api/admin-panel/support-tickets/list/",
  meta: "/api/admin-panel/support-tickets/list/table-meta/",
  detail: (id: string) => `/api/admin-panel/support-tickets/detail/${id}/`,
  cud: (id?: string) =>
    `/api/admin-panel/support-tickets/cud/${id ? `${id}/` : ""}`,
};

// Contract Endpoints
export const contractEndpoints = {
  list: (id: string) => `/api/project/contracts/${id}/`,
  download: (sid: string) =>
    `/api/project/contracts/download-pdf/?contract_sid=${sid}`,
};

// Quotation Endpoints
export const quotationEndpoints = {
  list: (id: string) => `/api/project/quotations/${id}/`,
  download: (sid: string) =>
    `/api/project/quotations/download-pdf/?quotation_sid=${sid}`,
};

// Payments Endpoints
export const paymentEndpoints = {
  list: (id: string) => `/api/project/payments/${id}/`,
  download: (sid: string) =>
    `/api/project/payments/download-pdf/?payment_sid=${sid}`,
};

// Leads Endpoints
export const leadEndpoints = {
  list: "/api/lead/list/",
  meta: "/api/lead/list/table-meta/",
  detail: (id: string) => `/api/lead/detail/${id}/`,
};

// Project Notes Endpoints
export const projectNotesEndpoints = {
  list: "/api/notes/list/",
  cud: `/api/notes/create/`,
};

export const designStartsWithYouEndpoints = {
  detail: (id: string) => `/api/user/floorplan/detail?project=${id}`,
};

export const profileEndpoints = {
  update: `/api/access/update/`,
  detailWithoutId: `api/access/user/`,
  detailWithId: (id: string) => `/api/access/user/detail/${id}/`,
  profilePictureUpload: `/api/access/user/profile-picture/upload/`,
};

export const ticketEndpoints = {
  list: `/api/admin/ticket/list/`,
  tableMeta: `/api/admin/ticket/list/table-meta/`,
  detail: (id: string) => `/api/admin/ticket/detail/${id}/`,
  cud: (id?: string) => `/api/admin/ticket/cud/${id ? `${id}/` : ""}`,
  upload: `/api/admin/ticket/file/upload/`,
  dashboard: `/api/admin/ticket/dashboard/`,
  createNote: `/api/admin/ticket/note/create/`,
  noteList: (id?: string) =>
    `/api/admin/ticket/note/list/${id ? `${id}/` : ""}`,
  cudMeta: `/api/admin/ticket/cud/meta/`,
  userList: `api/access/user/list/`,
};

export const knowledgeHubEndpoints = {
  detail: "/api/client/knowledge-hub/detail/",
  detailUpdate: (id?: string) =>
    `/api/client/knowledge-hub/update/${id ? `${id}/` : ""}`,
  blogCud: (id?: string) => `/api/client/blogs/cud/${id ? `${id}/` : ""}`,
  blogTagCreate: `/api/client/blog-tags/create/`,
  blogTagsList: `/api/client/blog-tags/list/`,
  blogImageUpload: `/api/client/blogs/image/upload/`,
  blogDetail: (id?: string) => `/api/client/blogs/detail/${id ? `${id}/` : ""}`,
  blogsList: `/api/client/blogs/list/`,
  blogMeta: `/api/client/blogs/meta/`,
  imageUpload: `/api/client/blogs/cover-image/upload/`,
};

export const testiomonialEndpoints = {
  list: "/api/client/testimonials/list/",
  cud: (id?: string) => `/api/client/testimonials/cud/${id ? `${id}/` : ""}`,
  upload: `/api/client/testimonials/file/upload/`,
  detail: (id: string) => `/api/client/testimonials/detail/${id}/`,
};

export const executionImagesEndpoints = {
  list: `/api/project/execution-image/list/`,
  cud: `/api/project/execution-image/cud/`,
  imageUpload: `/api/project/execution-image/upload/`,
};

export const showcaseEndpoints = {
  projectlist: `/api/client/showcase/projects/items/list/`,
  sectionList: `/api/client/showcase/sections/`,
  projectcud: (id?: string) =>
    `api/client/showcase/projects/cud/${id ? `${id}/` : ""}`,
  sectioncud: (id?: string) =>
    `api/client/showcase/sections/cud/${id ? `${id}/` : ""}`,
  coverImageupload: `/api/client/showcase/projects/cover-images/upload/`,
  imageUpload: `/api/client/showcase/projects/images/upload/`,
  videoUpload: `/api/client/showcase/projects/videos/upload/`,
  tagCud: `/api/client/showcase/tag/create/`,
  projectdetail: (id: string) => `/api/client/showcase/projects/detail/${id}/`,
  showcasedetail: (id: string) =>
    `/api/client/showcase/sections/profiles/${id}/`,
  meta: `/api/client/showcase/sections/cud/meta/`,
  tagList: `/api/client/showcase/project-tags/`,
  walkthroughCreate: (id?: string) =>
    `/api/client/showcase/walkthroughs/cud/${id ? `${id}/` : ""}`,
  videoCreate: (id?: string) =>
    `/api/client/showcase/videos/cud/${id ? `${id}/` : ""}`,
  walkthroughList: `/api/client/showcase/walkthroughs/list/`,
  videoList: `/api/client/showcase/videos/list/`,
  walkthroughdetail: (id: string) =>
    `/api/client/showcase/walkthroughs/detail/${id}/`,
  videodetail: (id: string) => `/api/client/showcase/videos/detail/${id}/`,
};

// Promotions Endpoints
export const promotionsEndpoints = {
  list: "/api/client/promotions/list/",
  cud: (id?: string) => `/api/client/promotions/cud/${id ? `${id}/` : ""}`,
  detail: (id: string) => `/api/client/promotions/detail/${id}/`,
  coverImageupload: `/api/client/promotions/cover-image/file/upload/`,
};

// Dashboard Endpoints
export const dashboardEndpoints = {
  admin: "/api/admin/dashboard/",
  designer: (id?: string) =>
    `/api/admin/dashboard/designer/${id ? `?designer_id=${id}` : ""}`,
};
