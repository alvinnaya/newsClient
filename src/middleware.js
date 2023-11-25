import { NextResponse } from 'next/server'

 
// This function can be marked `async` if using `await` inside
export function middleware(request,response) {
const apilink = process.env.API_KEY || 'localhost:3000' 
  if (request.nextUrl.pathname.startsWith('/writer')) {
    // This logic is only applied to /writer
    console.log('middleware')
  try {
    const data = request.cookies.get('jwt-token');
    console.log(JSON.parse(data.value))
    fetch(`http://${apilink}/api/writer/check`, {
      headers: {
        "jwt-token": data.value,
      },
    })
      .then((res) => res.status)
      .then((status) =>{ 
        console.log(status)
        if(status == 401 ){
          console.log('halaman selanjutnya')
          throw new Error("Token kadaluarsa");
        }

        console.log('lanjut')
        return NextResponse.next()
          
        
    }).catch(err =>{
      console.log('fail')
      console.log(err)
      console.log('redirect')
      return NextResponse.redirect(new URL('/auth/writer', request.url))
    })
    
  } catch (error) {
    console.error('gagal');
    return NextResponse.redirect(new URL('/auth/writer', request.url))
    console.error(error);
  }
 
  }

  if (request.nextUrl.pathname.startsWith('/auth/writer')) {
 
    const data = request.cookies.get('jwt-token');
    console.log(data)
    if(data){
      return NextResponse.redirect(new URL('/writer', request.url))
    }


  }


  if (request.nextUrl.pathname.startsWith('/admin')) {
    // This logic is only applied to /writer
    console.log('middleware admin')
  try {
    const data = request.cookies.get('admin-token');
    console.log(JSON.parse(data.value))
    fetch(`http://${apilink}/api/admin/check`, {
      headers: {
        "admin-token": data.value,
      },
    })
      .then((res) => res.status)
      .then((status) =>{ 
        if(status == 401 ){
          console.log('halaman selanjutnya')
          throw new Error("Token kadaluarsa");
        }
        return NextResponse.next()
    }).catch(err =>{
      console.log('fail')
      console.log(err)
      console.log('redirect')
      return NextResponse.redirect(new URL('/auth/admin', request.url))
    })
    
  } catch (error) {
    console.error('gagal');
    return NextResponse.redirect(new URL('/auth/admin', request.url))
    console.error(error);
  }
 
  }
  
  if (request.nextUrl.pathname.startsWith('/auth/admin')) {
 
    const data = request.cookies.get('admin-token');
    console.log(data)
    if(data){
      return NextResponse.redirect(new URL('/admin', request.url))
    }


  }

  
}
 
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
}