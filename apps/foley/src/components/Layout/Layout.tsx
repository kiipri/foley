// import Navbar from '@components/Navbar/Navbar';
import { FC, ReactNode } from 'react';
// import Footer from './Footer/Footer';

interface Props {
	children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
	return (
		<>
			{/* <Navbar /> */}
			{children}
			{/* <Footer /> */}
		</>
	);
};

export default Layout;
