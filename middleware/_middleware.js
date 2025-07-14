// 这是“Plan B”的 _middleware.js 代码，逻辑更直接
export default function middleware(request) {
  // 只处理对根路径'/'的请求
  if (request.nextUrl.pathname !== '/') {
    return; // 如果不是根路径，什么都不做
  }

  const acceptLanguage = request.headers.get('accept-language') || 'en';
  const preferredLang = acceptLanguage.split(',')[0].toLowerCase();
  
  let destinationPath = '/en'; // 默认路径

  if (preferredLang.startsWith('zh')) {
    destinationPath = '/cn';
  } else if (preferredLang.startsWith('es')) {
    destinationPath = '/es';
  } else if (preferredLang.startsWith('pt')) {
    destinationPath = '/pt';
  }
  
  // 直接构建一个全新的、完整的URL对象
  const redirectUrl = new URL(destinationPath, request.url);

  // 返回一个307临时重定向响应
  return Response.redirect(redirectUrl);
}