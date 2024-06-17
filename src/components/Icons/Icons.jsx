import classnames from "classnames";
import styles from "./Icons.module.scss";
import icons from "../../assets/icons/icons.svg";


export const Icon = ({ id, className, width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      id={id}
      className={classnames(styles.icons, className)}
    >
      <use xlinkHref={`${icons}#icon-${id}`} />
    </svg>
  );
}
