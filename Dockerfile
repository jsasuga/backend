FROM node:18.9.1-alpine as builder

RUN  apk add curl bash

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin

USER node

WORKDIR /home/node

COPY package.json yarn.lock tsconfig.build.json tsconfig.json ./

RUN yarn --frozen-lockfile

COPY . /home/node/

RUN yarn build

# run node prune
RUN /usr/local/bin/node-prune

# remove unused dependencies
RUN rm -rf node_modules/rxjs/src/
RUN rm -rf node_modules/rxjs/bundles/
RUN rm -rf node_modules/rxjs/_esm5/
RUN rm -rf node_modules/rxjs/_esm2015/
RUN rm -rf node_modules/swagger-ui-dist/*.map

# ---

FROM node:18.9.1-alpine

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/tsconfig* /home/node/
COPY --from=builder /home/node/yarn.lock /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/


CMD ["npm", "run", "start:prod"]