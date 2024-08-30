import { Text } from "@near-pagoda/ui";
import MintNft from "./MintNft";
import { useState } from "react";

const NonFungibletoken = () => {
    const [pepe, setPepe] = useState(1)
    return (<>
          <MintNft />
          <Text size="text-l" style={{marginBottom:"12px"}}> Community tools </Text>
        </>)
}

export default NonFungibletoken;