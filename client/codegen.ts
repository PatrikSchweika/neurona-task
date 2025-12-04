import { CodegenConfig } from "@graphql-codegen/cli";

// const config: CodegenConfig = {
//     overwrite: true,
//     schema: "http://localhost:5205/graphql",
//     documents: ["src/**/*.{ts,tsx}"],
//     ignoreNoDocuments: true,
//     generates: {
//         "./src/graphql/__generated__/graphql.ts": {
//             plugins: ["typescript"],
//         },
//         "./src/graphql/__generated__": {
//             preset: "near-operation-file",
//             presetConfig: {
//                 baseTypesPath: "./graphql.ts",
//             },
//             plugins: ["typescript-operations", "typed-document-node"],
//             config: {
//                 avoidOptionals: {
//                     field: true,
//                     inputValue: false,
//                 },
//                 defaultScalarType: "unknown",
//                 nonOptionalTypename: true,
//                 skipTypeNameForRoot: true,
//             },
//         },
//     },
// };

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://localhost:5205/graphql",
    documents: ["src/**/*.{ts,tsx}"],
    ignoreNoDocuments: true,
    generates: {
        "./src/graphql/__generated__/graphql.ts": {
            plugins: ["typescript", "typescript-operations"],
            config: {
                scalars: {
                  DateTime: "string",
                },
                avoidOptionals: {
                    field: true,
                    inputValue: false,
                },
                defaultScalarType: "unknown",
                nonOptionalTypename: true,
                skipTypeNameForRoot: true,
                noSchemaStitching: true
            },
        },
    },
};

export default config;