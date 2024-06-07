import { Text } from '@react-email/components';
import { applicationClientUrls } from '../constant/urls';

export default function Footnote({ hideNote }) {
	return (
		<>
			{!hideNote ? (
				<Text style={{ ...text, color: '#666666', marginBottom: '5px' }}>
					If you have any questions or feedbacks, reply to this email.
				</Text>
			) : null}
			<Text style={{ ...text, color: '#666666' }}>
				Cheers 🎉, <br />
				Abhishek from {applicationClientUrls.config.appName}
			</Text>
		</>
	);
}

const text = {
	color: '#000',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: '14px',
	lineHeight: '24px',
};