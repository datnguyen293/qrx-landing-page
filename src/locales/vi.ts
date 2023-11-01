export default {
  buttons: {
    verification: 'Xác thực',
  },

  common: {
    loading: 'Đang tải...',
    customer_name: 'Tên',
    phone_number: 'Số điện thoại',
    verify_code: 'Mã xác thực',
    serial: 'Mã serial',
    error: 'Lỗi',
    success: 'Thành công',
    warning: 'Cảnh báo',
    info: 'Thông tin',
    not_found: 'Không tìm thấy',
    verification_product: 'Xác thực sản phẩm',
    note_verification: `<span class="text-[#B61212]">Lưu ý:</span> Nhập chính xác thông tin họ tên, SĐT để đảm bảo các quyền lợi về tích điểm, đổi quà và các vấn đề xác thực, khiếu nại liên quan.`,
    not_found_content: 'Không có trên dữ liệu trên hệ thống. Vui lòng kiểm tra lại mã xác thực hoặc liên hệ hotline để được tư vấn. Xin cảm ơn!',
    error_content: 'Có lỗi đã xảy ra. Vui lòng kiểm tra lại mã xác thực hoặc liên hệ hotline để được tư vấn. Xin cảm ơn!',
    limit_scan: 'Số lượng quét vượt quá giới hạn',
    limit_scan_content: 'Số lượng quét vượt quá giới hạn. Vui lòng liên hệ hotline để được hỗ trợ',
    stamp_new_title: 'Cảnh báo',
    stamp_new_content: 'Sản phẩm chưa được xuất kho. Vui lòng liên hệ hotline để được hỗ trợ.',
    stamp_blocked_title: 'Cảnh báo',
    stamp_blocked_content: 'Mã tem đang bị khoá. Vui lòng liên hệ hotline để được hỗ trợ.',
    stamp_verified: 'Sản phẩm đã được xác thực trước đó. Vui lòng kiểm tra lại hoặc liên hệ với người bán để được hỗ trợ!',
    stamp_verify_success: 'Chúc mừng bạn! Đây là sản phẩm chính hãng. Xin cảm ơn quý khách!',

    stamp_cannot_access_scan_stamp_title: 'Cảnh báo',
    stamp_cannot_access_scan_stamp_content: 'Sản phẩm không được phép xác thực trên ứng dụng zalo mini app. Vui lòng kiểm tra lại hoặc liên hệ với người bán để được hỗ trợ!',
  },

  products: {
    title: 'Thông tin sản phẩm',
    detail: 'Chi tiết sản phẩm',
    name: 'Tên sản phẩm',
    brand: 'Thương hiệu',
    category: 'Danh mục',
    price: 'Giá',
    description: 'Mô tả'
  },

  placeholders: {
    customer_name: 'Nhập tên',
    phone_number: 'Nhập số điện thoại',
    verify_code: 'Nhập mã xác thực',
    serial: 'Nhập mã serial',
  },

  validator: {
    required: '{name} không được để trống',
    max: '{name} không được phép vượt quá {number} ký tự',
    min: '{name} không được phép ít hơn {number} ký tự',
    noWhiteSpace: '{name} không được chứa khoảng trắng',
    phone: 'Số điện thoại không đúng định dạng',
    minPhoneNumber: 'Số điện thoại không được phép ít hơn {number} kí tự',
  },
};
