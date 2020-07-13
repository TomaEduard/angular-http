import { tap } from 'rxjs/Operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor{

    // Run before the request leave the app
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('Request is on its way');
        // console.log(req.url);
        
        // const modifyRequestUrl = req.clone({ url: 'some-new-url' });
        const modifyRequestHeader = req.clone({ headers: req.headers.append('Auth', 'xyz')});

        // return next.handle(req);
        return next.handle(modifyRequestHeader)
        
    }

}