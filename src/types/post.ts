export interface PostShowType {
  post: {
  id: number
  title: string
  files: {
    id: number
    address: string
    size: number
    mime_type: string
  }[]
  user_like: boolean
  likes_count: number
}
}

export interface Post {
  id: number
  title: string
  files: {
    id: number
    address: string
    size: number
    mime_type: string
  }[]
  tags: {
    id: string;
    title: string;
  }[]
  user_like: boolean
  likes_count: number
}

export interface ListPostsProps {
  posts: Post[]
}

export interface TagType {
  tags: {
    tags: {
      id: string;
      title: string;
    }[]
  },
}

export interface PostSwiper {
  post: {
    id: number
    title: string
    tags: {
      id: string;
      title: string
    }[]
    files: {
      id: number
      address: string
      size: number
      mime_type: string
    }[]
    user_like: boolean
    likes_count: number
  } 
}

export interface UpdateType {
  post: {
    tags: {
      tags: {
        id: string;
        title: string;
      }[]
    },
    post: {
      id: number
      title: string
      tags: {
        id: string;
        title: string
      }[]
      files: {
        id: number
        address: string
        size: number
        mime_type: string
      }[]
      user_like: boolean
      likes_count: number
    }
  }
}

export interface Files {
  id: number
  address: string
  size: string
  mime_type: string
}

export interface FilesList {
  files: Files[],
}





export interface ShowPostType {
  post: {
    id: number,
    title: string,
    files: {
            id: number,
            address: string
            size: string
            mime_type: string
        }[],
        tags: {
           id: number;
           title: string
        }[]
        
    user_like: boolean,
    comments: [
         {
            id: number,
            body: string,
            user_id: number,
            model_type: number,
            model_id: number,
            comments: [
                {
                    id: number,
                    body: string,
                    user_id: number,
                    model_type: string,
                    model_id: number,
                }
            ]
         }
    ],
    likes_count: number
  }
  
}

export interface SessionType {
  apiToken: string;
  exp: number;
  expires: string;
  iat: number;
  jti: string;
  myToken: string;
  token: string;
  user: {
    avatar: string;
    fullname: string;
    id: number;
    username: string
  }
}