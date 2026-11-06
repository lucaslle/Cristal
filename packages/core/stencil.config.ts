import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'cristal',
  outputTargets: [
    { type: 'dist', esmLoaderPath: '../loader' },
    { type: 'dist-custom-elements', externalRuntime: false },
    { type: 'dist-hydrate-script', dir: 'hydrate' },
    reactOutputTarget({
      outDir: '../react/src/generated/',
      hydrateModule: '@cristal/core/hydrate',
      clientModule: '@cristal/react',
    }),
  ],
};
