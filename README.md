# Resplash

## Explanation of the what the app does and how it works

Resplash is a stock image store that lets you post, view, and search beautiful stock images. It is currently in development and orders/checkouts will be added in the future.

Currently it works by letting signed in users post a photo to the site with information like title, description, etc. and then shares the image publicly on the main photos page. Users can search the photos or just go through all of them on the index page.

## Project Links

- [Front End Deployed Site](https://resplash.lucasalombardo.now.sh/)
- [Front End Repository](https://github.com/LucasLombardo/resplash-client)
- [Back End Deployed API](https://resplash-yoga-production.lucasalombardo.now.sh/)
- [Back End Repository](https://github.com/LucasLombardo/resplash-api)

## Technologies Used

**Front End**

The front end uses Next.js, a server side rendering framework for React. It uses Apollo Client for state management, making queries and mutations, and caching the results. Styled components and the libraries react-photo-gallery and react-loading are being used for styling. Images are hosted and uploaded to the Cloudinary API.

**Back End**

The back end is using MySQL and a Prisma GraphQL server hosted on Heroku that acts sort of like an ORM, allowing for easy querying and mutations on the database. On top of that is a GraphQL yoga server hosted on Now.sh. GraphQL yoga is an express based server framework that allows for more customization like authentication, permissions, and limiting what information is exposed to the client.

## Unsolved Problems / Project Roadmap

One unsolved problem with the project is image watermarking. Currently, when images are uploaded to Cloudinary and transformed into their watermarked versions, the URL exposed to the client can easily be modified to remove the watermark. This is a security vulnerability since it could allow people to get the full resolution version of images without paying for them by domain hacking.

Future features that are still in development include:

- Adding images to a cart and checkout out
- Viewing and being able to download full resolution versions of images you have purchased
- Image categories and tags
- Favoriting images
- Sorting images by popularity (based on favorites or total amount of purchases)

## Planning, process and problem-solving strategy

My planning process was to sketch out wireframes and get the general idea of what the app should do and then break that down into many tasks. I used Trello for organizing the tasks that needed to be done and the ones I was currently working on. I used git branches to add large features and merge them in once they were working well.

When I encountered problems I generally used google first, then searching the github page for the technology I was having an issue with. If I could not find the answer I was looking for I would either come up with a workaround or post for help in the community of the technology I was having trouble with (most seem to have a slack, gitter, or discord).

## ERD
![ERD](https://res.cloudinary.com/dov1pamgz/image/upload/v1555298014/resplash-erd.png)

## Routes Catalog 
GraphQL APIs have one endpoint and can accept custom queries or mutations at that endpoint. They are self documenting in that you can explore them live. 

You can explore the API and documentation here:
[https://resplash-yoga-production.lucasalombardo.now.sh/](https://resplash-yoga-production.lucasalombardo.now.sh/)

Here is an example query that gets the first 5 photos with their title and descriptions:
```
query {
  photos(first: 5) {
    title
    description
  }
}
```

### Intallation instructions
**Front End**

Clone the front end repository and run `npm install`. once installed run `npm run dev` to enter development mode and view the app at `localhost:777`

**Back End**

Clone the back end repository and run `npm install`. Install prisma using `npm i -g prisma`. Run `prisma init` to start a new Prisma service. Select MySQL for the database and then choose your preferred options for where to host it (you can host locally, on their dev server, or elseware. Their dev server would probably be the easiest choice but you'll need to make an account at prisma.io). Refer to prisma docs if you have any trouble setting this up. Once you have a prisma server running paste your prisma endpoint into the prisma.yml file. Add a .env file with the following info: 
```
FRONTEND_URL="http://localhost:7777"
PRISMA_ENDPOINT="your prisma endpoint"
PRISMA_SECRET="secret string for prisma (can be any string just don't tell anyone)"
APP_SECRET="secret string for app (can be any string just don't tell anyone)"
PORT=4444
```
After that run `npm run deploy` to migrate the datamodels to your prisma server and finally run `npm run dev` to run you local graphql yoga server which will be hosted on the port specified in your .env file (4444).