import { next } from '@vercel/edge';

export const config = {
  matcher: '/', // 只对访问根路径 ("/") 的请求运行此中间件
};

export default function middleware(req) {
  // 从请求头中获取用户浏览器的语言设置
  const lang = req.headers.get('accept-language')?.split(',')?.[0] || '';

  // 定义跳转目标
  let destination = '/en'; // 默认跳转到英语页面

  if (lang.startsWith('zh')) {
    destination = '/cn';
  } else if (lang.startsWith('es')) {
    destination = '/es';
  } else if (lang.startsWith('pt')) {
    destination = '/pt';
  }
  
  // 获取完整的原始URL
  const url = req.nextUrl;
  // 在原始URL的基础上，将路径名替换为我们计算出的目标语言路径
  url.pathname = destination;

  // 执行重写，而不是重定向。这会让URL变更为.../en等，但服务器内部处理，体验更好
  return Response.redirect(url);
}