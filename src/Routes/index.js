import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './Routes'
import Header from '../Components/Header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'

export const useRoutes = (hasJWT) => {
	if (hasJWT()) {
		return (
			<>
				<Header />
				<div className={'main'}>
					<Sidebar />
					<Routes>
						{privateRoutes.map(({ path, element }, index) => (
							<Route key={index} path={path} element={element} />
						))}
					</Routes>
				</div>
			</>
		)
	}
	return (
		<Routes>
			{publicRoutes.map(({ path, element }, index) => (
				<Route key={index} path={path} element={element} />
			))}
		</Routes>
	)
}
