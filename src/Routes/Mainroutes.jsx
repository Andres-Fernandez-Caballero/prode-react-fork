import { Routes, Route } from 'react-router-dom';
import { NavigableLayer } from '../Components/NavigableLayer';
import { NotRequireAuth } from '../Components/NotRequireAuth';
import { RequireAuth } from '../Components/RequireAuth';
import { FormularioLoginTuProde } from '../Pages/FormularioLoginTuProde';
import { Home } from '../Pages/Home';
import { NotFound } from '../Pages/NotFound';
import { Login } from '../Pages/Login';
import { ProdeDetalle } from '../Pages/ProdeDetalle';
import { Register } from '../Pages/Register';
import { Reglas } from '../Pages/Reglas';
import { SuperProdePage } from '../Pages/SuperProde';
import Tabla from '../Pages/Tabla';
import { TuProde } from '../Pages/TuProde';

export const Mainroutes = () => {
	return (
		<Routes>
			<Route element={<NotRequireAuth redirectTo={'/'} />}>
				{/* rutas que no se pueden acceder al estar logueado */}
				<Route exact path='login' element={<Login />} />
				<Route exact path='register' element={<Register />} />
				<Route
					exact
					path='logintuprode'
					element={<FormularioLoginTuProde />}
				/>
			</Route>

			<Route element={<RequireAuth />}>
				{/* rutas que se pueden acceder al estar logueado */}
				<Route
					path='/'
					element={
						<NavigableLayer>
							<Home />
						</NavigableLayer>
					}
				/>
				<Route
					path='tuprode'
					element={
						<NavigableLayer>
							<TuProde />
						</NavigableLayer>
					}
				/>
			</Route>

			{/* Rutas totalemnte publicas */}
			<Route
				path='reglas'
				element={
					<NavigableLayer>
						<Reglas />
					</NavigableLayer>
				}
			/>
			<Route
				path='tabla'
				element={
					<NavigableLayer>
						<Tabla />
					</NavigableLayer>
				}
			/>
			<Route
				path='superprode'
				element={
					<NavigableLayer>
						<SuperProdePage />
					</NavigableLayer>
				}
			/>
			<Route
				path='prode/:uid'
				element={
					<NavigableLayer>
						<ProdeDetalle />
					</NavigableLayer>
				}
			/>

			{/* Rutas que no existen */}
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
};
