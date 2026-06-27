import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {}

// Used on AuthController. When a gRPC request hits authenticate(), this guard runs the JwtStrategy on the HTTP request object. Simple wrapper.
