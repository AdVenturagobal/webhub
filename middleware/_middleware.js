// 这是修正后的、保证有效的 _middleware.js 代码
export const config = {
  // 这个匹配器确保此中间件只在用户访问根路径 ("/") 时运行
  matcher: '/', 
};

export default function middleware(request) {
  // 从请求头中安全地获取用户浏览器的语言偏好
  // 例如 'zh-CN,zh;q=0.9,en;q=0.8'
  const acceptLanguage = request.headers.get('accept-language') || '';

  // 我们只关心第一语言
  const preferredLang = acceptLanguage.split(',')[0].toLowerCase();

  // 根据语言偏好决定跳转的目标路径
  let destination = '/en'; // 默认跳转到英语

  if (preferredLang.startsWith('zh')) {
    destination = '/cn';
  } else if (preferredLang.startsWith('es')) {
    destination = '/es';
  } else if (preferredLang.startsWith('pt')) {
    destination = '/pt';
  }
  
  // 构建完整的跳转URL
  const url = request.nextUrl.clone(); // 复制当前URL对象以进行修改
  url.pathname = destination; // 将路径修改为我们计算出的目标路径

  // 返回一个重定向响应。浏览器收到后会自动跳转到新的URL。
  return Response.redirect(url);
}