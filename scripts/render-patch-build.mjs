const apiKey = process.env.RENDER_API_KEY;
const serviceId = "srv-d8r69cmgvqtc73ekavdg";

const res = await fetch(`https://api.render.com/v1/services/${serviceId}`, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    serviceDetails: {
      envSpecificDetails: {
        buildCommand: "npm ci --include=dev && npm run build",
        startCommand: "npm run start:render",
      },
    },
  }),
});

console.log(await res.text());

const deploy = await fetch(`https://api.render.com/v1/services/${serviceId}/deploys`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: "{}",
});
console.log("deploy", deploy.status, await deploy.text());
