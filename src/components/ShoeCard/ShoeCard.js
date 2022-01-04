import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      {variant === 'new-release' && <Note >Just released!</Note>}
      {variant === 'on-sale' && <Sale > Sale</Sale>}
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          {variant === 'on-sale' && <Price>{formatPrice(price)}</Price>}
          {variant !== 'on-sale' && <span>{formatPrice(price)}</span>}
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  position: relative;
  text-decoration: none;
  color: inherit;

  //flex: 1 1 350px;
  //max-width: auto;

  flex: 1;
  min-width: 350px;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: line-through;
`;


const Note = styled.div`
  display: inline-block;
  position: absolute;
  top: 10px;
  right: -10px;
  z-index:1;

  padding: 7px 11px;
  background-color: ${COLORS.secondary};
  color: white;
  font-weight: 700;
  font-size: 14px;
  border-radius: 4px;
`;

const Sale = styled.div`
  display: inline-block;
  position: absolute;
  top: 10px;
  right: -10px;
  z-index:1;

  padding: 7px 11px;
  background-color: ${COLORS.primary};
  color: white;
  font-weight: 700;
  font-size: 14px;
  border-radius: 4px;
`;


const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
