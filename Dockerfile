FROM node:18 AS ui-build
WORKDIR /usr/src/app
COPY goshala-website/ ./goshala-website/
RUN cd goshala-website && npm install && npm run build


FROM node:18 AS server-build
WORKDIR /usr/src/app
COPY Backend/ ./Backend/
RUN cd Backend && npm install

FROM node:18
WORKDIR /usr/src/app/
COPY --from=ui-build /usr/src/app/goshala-website/dist ./goshala-website/dist
COPY --from=server-build /usr/src/app/Backend/ ./

EXPOSE 3000
CMD ["/bin/sh", "-c", "cd /usr/src/app/ && npm start"]
