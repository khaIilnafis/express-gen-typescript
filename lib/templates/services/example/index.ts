import Example from "../../models/sequelize/Example";

export async function findOneExample(exampleId: number) {
  return await Example.findOne({
    exampleId,
  });
}
