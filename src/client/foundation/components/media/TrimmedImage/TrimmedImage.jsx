import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TrimmedImageWrapper = styled.img`
  width: ${({$width}) => $width}px;
  aspect-ratio: ${({$width, $height}) => `${$width}/${$height}`};
  object-fit: cover;
`;


/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  return <TrimmedImageWrapper src={src} $width={width} $height={height} />;
};
