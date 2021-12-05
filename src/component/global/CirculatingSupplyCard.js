import { formatValue } from '../../utils/wrappers';

const CirculatingSupplyCard = () => {

	const formatCirculatinSupply = (value) => {
		return formatValue(null, value, 2);
	}

	return (
		<div className="font-14 mr-50 ml-5">
            <span className="color-a8"> Circulating Supply  </span> <span className="semi-bold color-prim  ml-10">{formatCirculatinSupply('149095543')} TRO</span>
        </div>
	);
}

export default CirculatingSupplyCard;