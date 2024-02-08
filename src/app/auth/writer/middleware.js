import { NextResponse } from 'next/server'
import jwt from "jsonwebtoken";

 
// This function can be marked `async` if using `await` inside
export function middleware(request,response) {

  console.log('middleware')
  
 
  
  // console.log(token)

  
  
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}