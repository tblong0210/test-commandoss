module skill_swap::trade {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::event;
    use std::string::{Self, String};

    // Error codes
    const ENotAuthorized: u64 = 0;
    const EInvalidStatus: u64 = 1;

    // Trade status constants
    const STATUS_PROPOSED: u8 = 0;
    const STATUS_ACCEPTED: u8 = 1;
    const STATUS_COMPLETED: u8 = 2;
    const STATUS_CANCELLED: u8 = 3;

    // Events
    struct TradeCreated has copy, drop {
        trade_id: address,
        proposer: address,
        recipient: address,
        description: String,
        created_at: u64,
    }

    struct TradeAccepted has copy, drop {
        trade_id: address,
        accepted_at: u64,
    }

    struct TradeCompleted has copy, drop {
        trade_id: address,
        completed_at: u64,
    }

    struct TradeCancelled has copy, drop {
        trade_id: address,
        cancelled_at: u64,
    }

    // Trade object
    struct Trade has key {
        id: UID,
        proposer: address,
        recipient: address,
        description: String,
        status: u8,
        created_at: u64,
        updated_at: u64,
    }

    // Create a new trade proposal
    public entry fun create_trade(
        recipient: address,
        description: vector<u8>,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let timestamp = tx_context::epoch_timestamp_ms(ctx);
        
        let trade = Trade {
            id: object::new(ctx),
            proposer: sender,
            recipient,
            description: string::utf8(description),
            status: STATUS_PROPOSED,
            created_at: timestamp,
            updated_at: timestamp,
        };

        let trade_id = object::uid_to_address(&trade.id);

        // Emit event
        event::emit(TradeCreated {
            trade_id,
            proposer: sender,
            recipient,
            description: string::utf8(description),
            created_at: timestamp,
        });

        // Transfer the trade object to the sender (proposer)
        transfer::share_object(trade);
    }

    // Accept a trade proposal
    public entry fun accept_trade(
        trade: &mut Trade,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let timestamp = tx_context::epoch_timestamp_ms(ctx);
        
        // Check that the sender is the recipient
        assert!(sender == trade.recipient, ENotAuthorized);
        
        // Check that the trade is in proposed status
        assert!(trade.status == STATUS_PROPOSED, EInvalidStatus);
        
        // Update trade status
        trade.status = STATUS_ACCEPTED;
        trade.updated_at = timestamp;

        // Emit event
        event::emit(TradeAccepted {
            trade_id: object::uid_to_address(&trade.id),
            accepted_at: timestamp,
        });
    }

    // Complete a trade
    public entry fun complete_trade(
        trade: &mut Trade,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let timestamp = tx_context::epoch_timestamp_ms(ctx);
        
        // Check that the sender is either the proposer or recipient
        assert!(sender == trade.proposer || sender == trade.recipient, ENotAuthorized);
        
        // Check that the trade is in accepted status
        assert!(trade.status == STATUS_ACCEPTED, EInvalidStatus);
        
        // Update trade status
        trade.status = STATUS_COMPLETED;
        trade.updated_at = timestamp;

        // Emit event
        event::emit(TradeCompleted {
            trade_id: object::uid_to_address(&trade.id),
            completed_at: timestamp,
        });
    }

    // Cancel a trade
    public entry fun cancel_trade(
        trade: &mut Trade,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let timestamp = tx_context::epoch_timestamp_ms(ctx);
        
        // Check that the sender is either the proposer or recipient
        assert!(sender == trade.proposer || sender == trade.recipient, ENotAuthorized);
        
        // Check that the trade is in proposed or accepted status
        assert!(trade.status == STATUS_PROPOSED || trade.status == STATUS_ACCEPTED, EInvalidStatus);
        
        // Update trade status
        trade.status = STATUS_CANCELLED;
        trade.updated_at = timestamp;

        // Emit event
        event::emit(TradeCancelled {
            trade_id: object::uid_to_address(&trade.id),
            cancelled_at: timestamp,
        });
    }

    // View functions (these don't modify state)
    
    // Get the proposer of the trade
    public fun proposer(trade: &Trade): address {
        trade.proposer
    }

    // Get the recipient of the trade
    public fun recipient(trade: &Trade): address {
        trade.recipient
    }

    // Get the description of the trade
    public fun description(trade: &Trade): &String {
        &trade.description
    }

    // Get the status of the trade
    public fun status(trade: &Trade): u8 {
        trade.status
    }

    // Get the creation timestamp of the trade
    public fun created_at(trade: &Trade): u64 {
        trade.created_at
    }

    // Get the last update timestamp of the trade
    public fun updated_at(trade: &Trade): u64 {
        trade.updated_at
    }
}
