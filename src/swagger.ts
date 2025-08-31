import path from "path";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { middleware as openApiValidator } from "express-openapi-validator";

const router = Router();
const spec = YAML.load(path.join(__dirname, "..", "docs", "openapi.yaml"));

router.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));

router.use(
  openApiValidator({
    apiSpec: spec,
    validateRequests: true,
    validateResponses: true,
  })
);

export default router;
