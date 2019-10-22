FROM node:10

RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg  add - && apt-get update -y && apt-get install google-cloud-sdk -y

RUN apt-get install kubectl

ENV HELM_VERSION=v2.14.1

RUN curl -O https://storage.googleapis.com/kubernetes-helm/helm-$HELM_VERSION-linux-amd64.tar.gz
RUN tar -zxvf helm-$HELM_VERSION-linux-amd64.tar.gz
RUN mv linux-amd64/helm /usr/local/bin/helm

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npm run build

EXPOSE 8080

RUN ["chmod", "+x", "./entrypoint.sh"]

CMD ["./entrypoint.sh"]
