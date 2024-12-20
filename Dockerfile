FROM node:18 AS ui-build
WORKDIR /usr/src/app
COPY GIASCHOOL/ ./GIASCHOOL/
RUN cd GIASCHOOL && npm install && npm run build


FROM node:18 AS server-build
WORKDIR /usr/src/app
COPY Backend/ ./Backend/
RUN cd Backend && npm install

FROM node:18
WORKDIR /usr/src/app/
COPY --from=ui-build /usr/src/app/GIASCHOOL/dist ./GIASCHOOL/dist
COPY --from=server-build /usr/src/app/Backend/ ./

EXPOSE 3000
CMD ["/bin/sh", "-c", "cd /usr/src/app/ && npm start"]
