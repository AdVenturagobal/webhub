export const config = {
  // 这个匹配器确保此中间件只在用户访问根路径 ("/") 时运行
  matcher: '/', 
};

export default function middleware(request) {
  // 从请求头中安全地获取用户浏览器的语言偏好
  const acceptLanguage = request.headers.get('accept-language') || 'en';
  const preferredLang = acceptLanguage.split(',')[0].toLowerCase();
  
  // 默认跳转到英语页面
  let destination = '/en'; 

  if (preferredLang.startsWith('zh')) {
    destination = '/cn';
  } else if (preferredLang.startsWith('es')) {
    destination = '/es';
  } else if (preferredLang.startsWith('pt')) {
    destination = '/pt';
  }
  
  // 构建一个全新的、完整的跳转目标URL
  const redirectUrl = new URL(destination, request.url);

  // 返回一个307临时重定向响应，这对SEO友好
  return Response.redirect(redirectUrl, 307);
}