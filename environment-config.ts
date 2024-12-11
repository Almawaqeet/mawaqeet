const dev = {
<<<<<<< HEAD
    API_URL: process.env.NEXT_PUBLIC_API_URL_DEV
  };
  
  const prod = {
    API_URL: process.env.NEXT_PUBLIC_API_URL_PROD
  };
  
  const getEnv = () => {
    switch (process.env.NODE_ENV) {
      case "development":
        return dev;
      case "production":
        return prod;
      default:
        return dev;
    }
  };
  
  export const env = getEnv();
  
  
  //? This is really weird, but it's working, ill just leave it here for now
  console.log("env API_URL", env.API_URL);
  
  export const API_URL = env.API_URL;
=======
  API_URL: process.env.NEXT_PUBLIC_API_URL_DEV
};

const prod = {
  API_URL: process.env.NEXT_PUBLIC_API_URL_PROD
};

const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return dev;
    case "production":
      return prod;
    default:
      return dev;
  }
};

export const env = getEnv();


//? This is really weird, but it's working, ill just leave it here for now
console.log("env API_URL", env.API_URL);

export const API_URL = env.API_URL;
>>>>>>> 324a3087e6a839788158f0143ff2ad26f5f520ff
