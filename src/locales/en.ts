export default {
  buttons: {
    verification: 'Verification',
  },

  common: {
    loading: 'Loading...',
    customer_name: 'Name',
    phone_number: 'Phone Number',
    verify_code: 'Verification Code',
    serial: 'Serial Number',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',
    not_found: 'Not Found',
    verification_product: 'Product Verification',
    note_verification: `<span class="text-[#B61212]">Note:</span> Please enter accurate personal information, including full name and phone number, to ensure the rights regarding point accumulation, gift redemption, and any related verification or complaint issues.`,
    not_found_content: 'No data found in the system. Please double-check the verification code or contact the hotline for assistance. Thank you!',
    error_content: 'An error occurred. Please double-check the verification code or contact the hotline for assistance. Thank you!',
  },

  placeholders: {
    customer_name: 'Typing name',
    phone_number: 'Typing phone number',
    verify_code: 'Typing code',
    serial: 'Typing serial',
  },

  validator: {
    required: '{name} is required',
    max: '{name} is not allowed to exceed {number} characters',
    min: '{name} not allowed less than {number} characters',
    noWhiteSpace: '{name} must not contain whitespace',
    phone: 'Phone number is invalid',
    minPhoneNumber: 'The phone number must not be less than {number} characters',
  },
};
