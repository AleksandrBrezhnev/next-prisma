import styled from '@emotion/styled';
import { css } from '@emotion/react';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
  margin: 0 auto;
  border-bottom: 1px solid #e4e4e4;  

  .header {
      &__nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__button {
            padding: 15px 25px;
            text-decoration: none;
            color: black;
            font-weight: 500;
            text-transform: uppercase;
            
            &__active {
                box-shadow: inset 0px -4px 3px -3px black;
             }
        &:hover {
           box-shadow: inset 0px -4px 3px -3px black;
        }

        }
      }
      &__logo {
        padding: 10px;
      }
  }
  }
`;

export default StyledHeader;
