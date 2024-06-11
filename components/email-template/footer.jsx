import { Hr, Link, Text } from '@react-email/components';
import { applicationClientUrls } from '../constant/urls';

const baseUrl = applicationClientUrls.host.home;

export default function Footer() {
	return (
		<>
			<Hr style={hr} />
			<Text style={footer}>
				&copy; {applicationClientUrls.config.currentYear}{' '}
				<Link href={baseUrl} target="_blank" style={{ ...link, textDecoration: 'underline' }}>
					{applicationClientUrls.config.appName}
				</Link>{' '}
				· Manage your expense easily.
			</Text>
		</>
	);
}

const link = {
	color: '#0669ce',
	textDecoration: 'none',
};

const footer = {
	color: '#666666',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: '12px',
	lineHeight: '24px',
};

const hr = {
	border: 'none',
	borderTop: '1px solid #eaeaea',
	margin: '26px 0',
	width: '100%',
};