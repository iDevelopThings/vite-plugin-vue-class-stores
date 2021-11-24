import type {HmrContext} from "vite";
import {generate, Configuration, isInternallyGeneratedFile, PluginConfiguration} from "vue-class-stores-generators";
import type {InputOptions} from 'rollup';


export function viteVueClassStoresPlugin(configuration?: PluginConfiguration) {
	Configuration.setConfiguration(configuration);

	return {
		name : 'class-stores-loader',
		buildStart(options: InputOptions) {
			generate(undefined, configuration);

			this.addWatchFile(Configuration.storesPath);
		},
		handleHotUpdate(context: HmrContext) {
			if (isInternallyGeneratedFile(context.file)) {
				return [];
			}

			if (context.file.includes(Configuration.storesDirectory)) {
				generate(undefined, configuration);
			}


			return context.modules;
		}
	};
}
