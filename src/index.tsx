import 'typeface-montserrat';

import { configure } from 'mobx';
import { observer, Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ErrorBoundary from '@components/boundary/ErrorBoundary';
import { RootStore } from '@store/RootStore';
import * as serviceWorker from '@utils/serviceWorker';

// Apply the theme
import '@theme/default/index.less';

// MobX: Enforce strict mode
configure({ enforceActions: 'observed' });

@observer
export class Main extends React.Component {
	private store = new RootStore();

	constructor(props: any, context?: any) {
		super(props, context);
		const { router } = this.store.routerStore;
		router.start();
	}

	public componentDidMount() {
		this.store.contactUsStore.echoRequest('Contact API Connected!');
	}

	public renderRoute() {
		const { route, routes } = this.store.routerStore;
		if (route) {
			return routes[route.name].component(route.params);
		}
	}

	public render() {
		return (
			<Provider
				store={this.store}
				contactUsStore={this.store.contactUsStore}
				flagStore={this.store.flagStore}
				routerStore={this.store.routerStore}
			>
				<ErrorBoundary>{this.renderRoute()}</ErrorBoundary>
			</Provider>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root') as HTMLElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
