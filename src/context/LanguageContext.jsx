import React, { createContext, useContext, useState } from 'react'

const translations = {
  en: {
    home: 'Home',
    products: 'Products',
    contact: 'Contact',
    cart: 'Cart',
    account: 'Account',
    sign_in: 'Sign In',
    sign_up: 'Sign Up',
    sign_out: 'Sign Out',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    create_account: 'Create Account',
    already_have_account: 'Already have an account?',
    processing: 'Processing...',
    account_settings: 'Account Settings',
    welcome_to_ansa: 'Welcome to ANSA',
    hero_description: 'Your one-stop shop for premium sports gear and equipment',
    shop_now: 'Shop Now',
    featured_products: 'Featured Products',
    no_products_found: 'No products found',
    jerseys: 'Jerseys',
    cleats: 'Cleats',
    accessories: 'Accessories',
    all: 'All',
    add_to_cart: 'Add to Cart',
    order_summary: 'Order Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    total: 'Total',
    free: 'Free',
    proceed_to_checkout: 'Proceed to Checkout',
    clear_cart: 'Clear Cart',
    empty_cart: 'Your cart is empty',
    continue_shopping: 'Continue Shopping',
    checkout: 'Checkout',
    shipping_details: 'Shipping Details',
    guest_checkout: 'Guest Checkout',
    login_to_checkout: 'Login to Checkout',
    full_name: 'Full Name',
    address: 'Address',
    city: 'City',
    zip_code: 'Zip Code',
    phone: 'Phone',
    pay_now: 'Pay Now',
    order_success: 'Order Successful!',
    order_success_message: 'Thank you for your purchase. You will be redirected to the homepage shortly.',
    contact_us: 'Contact Us',
    message: 'Message',
    send_message: 'Send Message',
    message_sent_success: 'Message sent successfully!',
    contact_info: 'Contact Information',
    page_not_found: 'Page Not Found',
    go_home: 'Go Home',
    admin_panel: 'Admin Panel',
    manage_products: 'Manage Products',
    edit: 'Edit',
    delete: 'Delete',
    orders: 'Orders',
    users: 'Users',
    customer_details: 'Customer Details',
    order_items: 'Order Items',
    joined: 'Joined',
    pending: 'Pending',
    paid: 'Paid',
    shipped: 'Shipped',
    cancelled: 'Cancelled',
    all_fields_required: 'All fields are required',
    sending: 'Sending...',
    customer_reviews: 'Customer Reviews',
    footer_description: 'Your one-stop shop for premium sports gear and equipment.',
    quick_links: 'Quick Links',
    newsletter: 'Newsletter',
    enter_email: 'Enter your email',
    subscribe: 'Subscribe',
    all_rights_reserved: 'All rights reserved',
    // In your LanguageContext translations
    out_of_stock: 'Out of Stock',
    only_x_left: 'Only {count} left!',
    product_added_to_cart: 'Product added to cart!',
    view_cart: 'View Cart'
  },
  ka: {
    home: 'მთავარი',
    products: 'პროდუქცია',
    contact: 'კონტაქტი',
    cart: 'კალათა',
    account: 'ანგარიში',
    sign_in: 'შესვლა',
    sign_up: 'რეგისტრაცია',
    sign_out: 'გამოსვლა',
    name: 'სახელი',
    email: 'ელ. ფოსტა',
    password: 'პაროლი',
    create_account: 'ანგარიშის შექმნა',
    already_have_account: 'უკვე გაქვთ ანგარიში?',
    processing: 'მუშავდება...',
    account_settings: 'ანგარიშის პარამეტრები',
    welcome_to_ansa: 'კეთილი იყოს თქვენი მობრძანება ANSA-ში',
    hero_description: 'პრემიუმ სპორტული აღჭურვილობის ერთადერთი მაღაზია',
    shop_now: 'იყიდე ახლავე',
    featured_products: 'რეკომენდირებული პროდუქტები',
    no_products_found: 'პროდუქტები ვერ მოიძებნა',
    jerseys: 'ფორმები',
    cleats: 'ბუცები',
    accessories: 'აქსესუარები',
    all: 'ყველა',
    add_to_cart: 'კალათაში დამატება',
    order_summary: 'შეკვეთის დეტალები',
    subtotal: 'ჯამი',
    shipping: 'მიტანა',
    total: 'სულ',
    free: 'უფასო',
    proceed_to_checkout: 'გადახდა',
    clear_cart: 'კალათის გასუფთავება',
    empty_cart: 'თქვენი კალათა ცარიელია',
    continue_shopping: 'გაგრძელება',
    checkout: 'გადახდა',
    shipping_details: 'მიტანის დეტალები',
    guest_checkout: 'გადახდა სისტემაში შესვლის გარეშე',
    login_to_checkout: 'გადახდა სისტემაში შესვლით',
    full_name: 'სრული სახელი',
    address: 'მისამართი',
    city: 'ქალაქი',
    zip_code: 'საფოსტო კოდი',
    phone: 'ტელეფონი',
    pay_now: 'გადახდა ახლავე',
    order_success: 'შეკვეთა წარმატებით დასრულდა!',
    order_success_message: 'გმადლობთ შეძენისთვის. მალე გადამისამართდებით მთავარ გვერდზე.',
    contact_us: 'დაგვიკავშირდით',
    message: 'შეტყობინება',
    send_message: 'შეტყობინების გაგზავნა',
    message_sent_success: 'შეტყობინება წარმატებით გაიგზავნა!',
    contact_info: 'საკონტაქტო ინფორმაცია',
    page_not_found: 'გვერდი ვერ მოიძებნა',
    go_home: 'მთავარ გვერდზე დაბრუნება',
    admin_panel: 'ადმინისტრატორის პანელი',
    manage_products: 'პროდუქტების მართვა',
    edit: 'რედაქტირება',
    delete: 'წაშლა',
    orders: 'შეკვეთები',
    users: 'მომხმარებლები',
    customer_details: 'მომხმარებლის ინფორმაცია',
    order_items: 'შეკვეთის პროდუქტები',
    joined: 'შემოუერთდა',
    pending: 'მოლოდინში',
    paid: 'გადახდილი',
    shipped: 'გაგზავნილი',
    cancelled: 'გაუქმებული',
    all_fields_required: 'ყველა ველი სავალდებულოა',
    sending: 'იგზავნება...',
    customer_reviews: 'მომხმარებელთა შეფასებები',
    footer_description: 'პრემიუმ სპორტული აღჭურვილობის ერთადერთი მაღაზია.',
    quick_links: 'სწრაფი ბმულები',
    newsletter: 'სიახლეები',
    enter_email: 'შეიყვანეთ ელ. ფოსტა',
    subscribe: 'გამოწერა',
    all_rights_reserved: 'ყველა უფლება დაცულია',
    // In your LanguageContext translations
    out_of_stock: 'არ არის მარაგში',
    only_x_left: 'მხოლოდ {count} დარჩა!',
    product_added_to_cart: 'პროდუქტი დაემატა კალათაში!',
    view_cart: 'კალათის ნახვა'
  }
}

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ka')

  const t = (key, params) => {
    let translation = translations[language][key] || key;
    if (params) {
      Object.keys(params).forEach(paramKey => {
        translation = translation.replace(`{${paramKey}}`, params[paramKey]);
      });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
