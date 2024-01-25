export type SignupResponseType =
  | {
      error: string;
      status: 409 | 500;
    }
  | {
      error: null;
      status: 201;
    }
  | {
      error: {
        username?: string[] | undefined;
        password?: string[] | undefined;
        email?: string[] | undefined;
      };
      status: 400;
    };

export type SigninResponseType =
  | {
      error: string;
      status: 404 | 500;
    }
  | { error: null; status: 200 }
  | {
      error: {
        password?: string[] | undefined;
        email?: string[] | undefined;
      };
      status: 400;
    };

export type CreatePostResponseType =
  | {
      error: string;
      status: 401 | 500;
    }
  | {
      error: {
        title?: string[] | undefined;
        body?: string[] | undefined;
        image?: string[] | undefined;
        tags?: string[] | undefined;
      };
      status: 400;
    };

export type UpdatePostResponseType = CreatePostResponseType;
