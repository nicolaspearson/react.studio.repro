import { inject, observer } from 'mobx-react';
import * as React from 'react';

import Head from '@components/structural/Head';
import Header from '@components/structural/Header';
import Page from '@components/structural/Page';
import LandingHead from '@components/ui/LandingHead';
import { RouterStore } from '@store/RouterStore';

import About from '@pages/Landing/About';

import './style.less';

export interface LandingProps {
	routerStore?: RouterStore;
}

@inject('routerStore')
@observer
class Landing extends React.Component<LandingProps> {
	public render() {
		return (
			<Page>
				<Head>
					<title>Home</title>
					<meta name="Description" content="Home" />
				</Head>
				<Header />
				<section className="Landing__Main">
					<LandingHead routerStore={this.props.routerStore} />
					<About />
				</section>
			</Page>
		);
	}
}

export default Landing;
