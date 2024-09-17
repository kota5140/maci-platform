import type { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import type { TallyData } from "maci-cli";
import type { Proof } from "maci-contracts";
import type { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";
import type { Chain, Hex, HttpTransport, PublicClient, Transport } from "viem";

import { ESupportedNetworks } from "../common";

/**
 * WS events for proof generation
 */
export enum EProofGenerationEvents {
  START = "start-generation",
  PROGRESS = "progress-generation",
  FINISH = "finish-generation",
  ERROR = "exception",
}

/**
 * Interface that represents generate proofs arguments
 */
export interface IGenerateArgs {
  /**
   * Poll id
   */
  poll: number;

  /**
   * Maci contract address
   */
  maciContractAddress: string;

  /**
   * Tally contract address
   */
  tallyContractAddress: string;

  /**
   * Whether to use Qv or NonQv
   */
  useQuadraticVoting: boolean;

  /**
   * Encrypted coordinator private key with RSA public key (see .env.example)
   */
  encryptedCoordinatorPrivateKey: string;

  /**
   * Start block for event processing
   */
  startBlock?: number;

  /**
   * End block for event processing
   */
  endBlock?: number;

  /**
   * Blocks per batch for event processing
   */
  blocksPerBatch?: number;
}

/**
 * Interface that represents generated proofs data
 */
export interface IGenerateData {
  /**
   * Message processing proofs
   */
  processProofs: Proof[];

  /**
   * Tally proofs
   */
  tallyProofs: Proof[];

  /**
   * TallyData
   */
  tallyData: TallyData;
}

/**
 * Interface that represents zkey filepaths
 */
export interface IGetZkeyFilesData {
  /**
   * Zkey filepath
   */
  zkey: string;

  /**
   * Wasm filepath
   */
  wasm: string;
}

/**
 * Merge arguments
 */
export interface IMergeArgs {
  /**
   * MACI contract address
   */
  maciContractAddress: string;
  /**
   * Poll ID
   */
  pollId: number;
  /**
   * Approval for the session key
   */
  approval: string;
  /**
   * Session key address
   */
  sessionKeyAddress: Hex;
  /**
   * Chain
   */
  chain: ESupportedNetworks;
}

/**
 * Merge message sub-trees
 */
export interface IMergeMessageSubTreesArgs {
  /**
   * Public client
   */
  publicClient: PublicClient<HttpTransport, Chain>;
  /**
   * Kernel client
   */
  kernelClient: KernelAccountClient<
    ENTRYPOINT_ADDRESS_V07_TYPE,
    Transport,
    Chain,
    KernelSmartAccount<ENTRYPOINT_ADDRESS_V07_TYPE, HttpTransport, Chain>
  >;
  /**
   * Poll address
   */
  pollAddress: Hex;
  /**
   * Message AQ address
   */
  messageAqAddress: Hex;
}
