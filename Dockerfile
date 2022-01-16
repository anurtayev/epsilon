FROM public.ecr.aws/lambda/nodejs:14
WORKDIR /app
COPY package.json package-lock.json* npm-shrinkwrap.json* ./
RUN SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install --production --arch=x64 --platform=linux